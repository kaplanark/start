# Start Sass Template

install npm modüles
<code>npm i </code>

to make it work
<code>gulp </code>

## for deploy ftp server
Create the .evn file in the root folder and add the following

```
host = test@ftp.hostname.com

user = your username

password = your password
```

Set the task named deploy to your project in the gulp file
example

<u>gulfile.js *</u>
<small>main file</small>
```
gulp.task( 'deploy', function () {
  var conn = ftp.create({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port:21,
    parallel: 1,
    log: gutil.log
  });

  //folders and files to upload
  var globs = [ 
    'css/**',
    'js/**,
    'includes/**',
    'index.html'
  ];

  return gulp.src(globs, { base: '.', buffer: false,dot:true})
    .pipe(conn.newer('/public_html))
    .pipe(conn.dest('/public_html'));

});
```

later on <code>gulp deploy</code>
