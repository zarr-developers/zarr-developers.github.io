# zarr.dev

Main Zarr website hosted at https://zarr.dev

## Building

To build the webpage, you will need a working Ruby installation.

If you are on Ubuntu and want to install the requirements locally,
follow the steps below as root. Alternatively, see the Dockerfile
for an alternative.

1. Install `rvm`.

```
gpg --keyserver hkp://keyserver.ubuntu.com --recv-keys 409b6b1796c275462a1703113804bb82d39dc0e3 7d2baf1cf37b13e2069d6956105bd0e739499bdb && curl -sSL https://get.rvm.io | bash -s stable
```

2. Install Ruby
```
rvm autolibs disable && rvm install ruby 3.4.3
```

Note that if the above fails, you may need to specify the path for the `rvm` command in your system.

3. Install `bundler`

```
gem install bundler
```

4. In the root of the repository, run:

```
bundle install
```

5. Build and serve the site locally:

```
bundle exec jekyll serve --source content/
```
