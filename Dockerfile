FROM ruby:3.4-slim

RUN gem install bundler

COPY . /src
WORKDIR /src

RUN apt-get update -y
RUN apt-get install ruby-dev -y
RUN apt-get install make gcc g++ -y
RUN bundle install
RUN cat Gemfile.lock
ENTRYPOINT bundle exec jekyll serve --source content/
