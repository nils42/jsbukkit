from paver.easy import *
from glob import iglob
from shutil import rmtree, copyfileobj, copy
import os

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
output_dir = build_dir + 'jsbukkit/'
output_assets_dir = output_dir + 'assets/'
output_js_dir = output_assets_dir + 'js/'
output_js_lib_dir = output_js_dir + 'lib/'
output_css_dir = output_assets_dir + 'css/'
output_img_dir = output_assets_dir + 'img/'

js_dirs = ('models', 'controllers', 'views', 'datasource')

@task
def clean():
    ''' Cleanup builddir '''
    if path(build_dir).exists():
        rmtree(build_dir)
    for filename in iglob(build_dir + 'jsbukkit*.tar.gz'):
        os.remove(filename)

@task
@needs(['clean'])
def build():
    ''' Build '''

    # Build app.js
    for path in (output_js_lib_dir, output_css_dir, output_img_dir):
        os.makedirs(path)

    with open(output_js_dir + 'app.js', 'w') as appjs:
        copyfileobj(open(src_dir + 'app.js', 'r'), appjs)

        for path in ('models/', 'datasource/', 'views/', 'controllers/'):
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
