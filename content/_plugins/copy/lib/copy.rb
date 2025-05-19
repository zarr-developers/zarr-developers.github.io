# frozen_string_literal: true

require "jekyll"
require 'fileutils'

class Copy
  def self.copy_cname(site)
    source_file = File.join(site.source, "CNAME")
    target_file = File.join(site.dest, "CNAME")
    FileUtils.copy(source_file, target_file)
    Jekyll.logger.info "\t\tSource: #{source_file.sub! site.source, "/content"}"
    Jekyll.logger.info "\t\tTarget: #{target_file.sub! site.dest, "/_site"}"
    Jekyll.logger.info "\n"
  end

  def self.copy_data_folder_for_translations(site)
    default_lang = site.config["default_language"]
    source_dir = File.join(site.source, "_data", default_lang)
    target_dir = File.join(site.source, default_lang, "_data", default_lang)

    # Ensure the target directory exists
    FileUtils.mkdir_p(target_dir)

    # Copy all files from source to target
    Dir.glob(File.join(source_dir, "*")).each do |file|
      target = File.join(target_dir, File.basename(file))
      next if File.directory?(file) # Skip directories
      FileUtils.copy(file, target)
      Jekyll.logger.info "\t\tSource: #{file.sub! site.source, "/content"}"
      Jekyll.logger.info "\t\tTarget: #{target.sub! site.source, "/content"}"
      Jekyll.logger.info "\n"
    end
  end

  def self.copy_translations_to_data_folder(site)
    default_lang = site.config["default_language"]
    languages = site.config["languages"]
    languages.each do |data|
      lang = data["prefix"]
      if lang != default_lang
        source_dir = File.join(site.source, lang, "_data", lang)
        target_dir = File.join(site.source, "_data", lang)

        # Ensure the target directory exists
        FileUtils.mkdir_p(target_dir)

        # Copy all files from source to target
        Dir.glob(File.join(source_dir, "*")).each do |file|
          target = File.join(target_dir, File.basename(file))
          next if File.directory?(file) # Skip directories
          FileUtils.copy(file, target)

          Jekyll.logger.info "\t\tSource: #{file.sub! site.source, "/content"}"
          Jekyll.logger.info "\t\tTarget: #{target.sub! site.source, "/content"}"
          Jekyll.logger.info "\n"
        end
      end
    end
  end
end

Jekyll::Hooks.register :site, :after_init do |site|
  Jekyll.logger.info "\n\t# Copy source files:\n"
  Copy.copy_data_folder_for_translations(site)
  Jekyll.logger.info "\n\t# Copy translation files:\n"
  Copy.copy_translations_to_data_folder(site)
end

Jekyll::Hooks.register :site, :post_write do |site|
  Jekyll.logger.info "\n\t# Copy CNAME file:\n"
  Copy.copy_cname(site)
end
