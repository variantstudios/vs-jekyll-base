# Jekyll / CloudCannon Base

# Setup OS with correct versions of Node and Ruby

## Developed/Tested using:

* Ruby v2.3.0
  > See [`.ruby-version`](.ruby-version) to confirm required version
* Node v6.12.1
  > * See [`.nvmrc`](.nvmrc) to confirm required version
  > * Also see, the following configurations which should agree with [`.nvmrc`](.nvmrc)
  >   * [`appveyor.yml`](appveyor.yml) for `nodejs_version` environment variable
  >   * [`package.json`](package.json) for `engines.node` property value

## Setup of software on your OS

Managing multiple versions of ruby and node for different projects can be a pain without a version
manager. This project is configured to work with `rvm` and `nvm`.

> More Info:
>
> * Ruby Version Management
>   * On Windows, try: [uru](https://bitbucket.org/jonforums/uru)
      * Could also try: [Pik: Ruby version manager - chocolatey install](https://chocolatey.org/packages/pik), however
        [pik: Ruby version manager is no longer maintained](https://github.com/vertiginous/pik#no-longer-maintained)
>   * On Unix-y platforms, try: [RVM: Ruby Version Manager](https://rvm.io/)
>
> * Node Version Management
>   * On Window, try [nvm\-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows)
>   * On Unix-y platforms, try: [nvm](https://github.com/creationix/nvm)

Before continuing with **Install**, make sure you are using correct version of ruby and node.

If using `nvm and `rvm`, you can install with:

```bash
rvm install "ruby-2.3.0"
nvm install 6.12.1
```

And you can switch to these versions after `cd`ing into this directory using

```bash
rvm use
nvm use
```

Regardless if you are using a version manager and which version you are using, verify versions you have
with these commands:

```bash
ruby --version
node --version
```

Finally verify `bundle` command is installed with command: `which bundle` and if
this command returns no result, install it with `gem install bundler`.  You can
check the version installed with the command `bundle --version`.

# Setup the site

### Install the Ruby Gems
`$ bundle install`

### Install the Node packages
`$ npm install`


## Tests

Run `npm test` to run tests for website. These tests must pass and will be
validated by CI tool during pull request review. Any errors will block merging a
pull request.

Tests include:
* eslint rules for javascript
* markdown proof rules

## Compile

To compile Jekyll, SASS and run a local server (with browsersync) you'll need to run `$ npm start` and the site should open in your browser at the following address: http://localhost:3000.

To just build the site run `npm run build`.

# Site information:
- Currently we have Jekyll version 3.7.1 to be used locally and also in our CloudCannon site.
- Make sure you replace the following placeholder graphics:
    - /favicon.ico
    - /siteicon.png
    - /apple-touch-icon.png
    - /touch-icon.png
 - A 'robots.txt' file initially set to Disallow everything to avoid getting your site indexed on search engines before it's ready. Once your website is ready to launch remove this robots.txt file and rename the 'USE-WHEN-live--robots.txt' file to 'robots.txt' so it will not tell search engines to not index your site. If you add 'noindex: true' to your the frontmatter of any file it will add it to be not indexed on the robots.txt file.
 - A '/301.md' file where you can add your site's 301 reirects.
 - A '/404.html' file that will show when when a page can not be found. Feel free to customize the content or remove it.

# What's included in this base:
1. XML Sitemap powered by a jekyll plugin. https://github.com/jekyll/jekyll-sitemap
2. Jekyll Paginate Version 2 powered by a jekyll plugin. https://github.com/sverrirs/jekyll-paginate-v2
3. An atom.xml for a blog and if you don't have one feel free to remove it.
