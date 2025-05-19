# frozen_string_literal: true

require_relative "lib/copy/version"

Gem::Specification.new do |s|
  s.name        = "copy"
  s.summary     = "Copy files forl localization"
  s.version     = Jekyll::Copy::VERSION
  s.authors     = ["GitHub, Inc."]
  s.email       = "support@github.com"

  s.homepage = "https://github.com/jekyll/jemoji"
  s.licenses = ["MIT"]
  s.files    = ["lib/copy.rb"]

  s.required_ruby_version = ">= 3.4.1"
end