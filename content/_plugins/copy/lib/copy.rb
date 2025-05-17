# frozen_string_literal: true

require "jekyll"
require 'fileutils'

class Copy
  def self.copy_data_folder_for_translations(site)
    source_dir = File.join(site.source, "_data", "en")
    target_dir = File.join(site.source, "en", "_data", "en")

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
    languages = site.config["languages"]
    languages.each do |data|
      lang = data["prefix"]
      if lang != "en"
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
