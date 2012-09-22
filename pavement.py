from paver.easy import *
from glob import iglob
from shutil import rmtree, copyfileobj, copy
from tarfile import TarFile
from os.path import basename, splitext
from re import escape
from os import remove, chdir, makedirs

try:
    from subprocess import check_output
except ImportError:
    import subprocess
    def check_output(*popenargs, **kwargs):
        """Run command with arguments and return its output as a byte string.

        Backported from Python 2.7 as it's implemented as pure python on stdlib.

        >>> check_output(['/usr/bin/python', '--version'])
        Python 2.6.2
        Source: https://gist.github.com/1027906
        """
        process = subprocess.Popen(stdout=subprocess.PIPE, *popenargs, **kwargs)
        output, unused_err = process.communicate()
        retcode = process.poll()
        if retcode:
            cmd = kwargs.get("args")
            if cmd is None:
                cmd = popenargs[0]
            error = subprocess.CalledProcessError(retcode, cmd)
            error.output = output
            raise error
        return output

options(
    setup=dict(
        name='jsbukkit',
        version='0.1',
        description='Bukkit server manager',
        author='Richard Marshall',
        author_email='rgm@linux.com'
    )
)

src_dir = 'app/'
build_dir = 'build/'
hbs_dir = src_dir + 'templates/'
output_dir = build_dir + 'jsbukkit/'
output_assets_dir = output_dir + 'assets/'
output_js_dir = output_assets_dir + 'js/'
output_js_lib_dir = output_js_dir + 'lib/'
output_css_dir = output_assets_dir + 'css/'
output_img_dir = output_assets_dir + 'img/'
js_dirs = ('models/', 'controllers/', 'views/', 'datasource/')

@task
def clean():
    ''' Cleanup builddir '''
    if path(output_dir).exists():
        rmtree(output_dir)
    for filename in iglob(build_dir + 'jsbukkit*.tar.gz'):
        remove(filename)

@task
@needs(['clean'])
def build():
    ''' Build '''

    # Build app.js
    for path in (output_js_lib_dir, output_css_dir, output_img_dir):
        makedirs(path)

    with open(output_js_dir + 'app.js', 'w') as appjs:
        copyfileobj(open(src_dir + 'app.js', 'r'), appjs)

        for path in iglob(hbs_dir + '*.hbs'):
            with open(path, 'r') as tpl:
                tpl_str = escape(tpl.read())
                tpl_fmt = 'Em.TEMPLATES["%s"] = Em.Handlebars.compile("%s");' % (splitext(basename(path))[0], tpl_str)
                appjs.write(tpl_fmt)

        for path in js_dirs:
            for filename in iglob(src_dir + path + '*.js'):
                copyfileobj(open(filename, 'r'), appjs)

        copyfileobj(open(src_dir + 'router.js', 'r'), appjs)

    copy('config.js', output_js_dir)

    # copy html
    for path in iglob(src_dir + 'html/*.html'):
        copy(path, output_dir)

    # Copy 3rd party libs into place
    for path in iglob(src_dir + 'lib/*.js'):
        copy(path, output_js_lib_dir)

    # Copy css
    for path in iglob(src_dir + 'css/*.css'):
        copy(path, output_css_dir)

    # Copy images
    for path in iglob(src_dir + 'img/*'):
        copy(path, output_img_dir)

@task
@needs(['build'])
def archive():
    ''' create tar.gz archive '''
    tarpath = build_dir + 'jsbukkit.tar.gz'
    if path(tarpath).exists():
        remove(tarpath)
    tar = TarFile.open(tarpath, 'w:gz')
    chdir(build_dir)
    tar.add('jsbukkit')
    tar.close()


