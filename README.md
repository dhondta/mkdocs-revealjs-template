# MkDocs/Reveal.js Template

This project provides a template of static documentation website for [MkDocs](http://mkdocs.org) using a ReadTheDocs-like theme by default.

It nests [Reveal.js](http://lab.hakim.se/reveal-js) for integrating nice-looking slideshows in order to make more didactical documentations.

An example can be found at [`dhondta/pentest-for-beginners`](https://github.com/dhondta/pentest-for-beginners).


## Features

This template includes pluggable versions of the following projects:

- [Reveal.js](http://lab.hakim.se/reveal-js): for making slideshows inside the documentation website

The following extra [Reveal.js](http://lab.hakim.se/reveal-js) plugins are available for embedding extra items inside the presentations:

- flowchart-js (using [Flowchart.js](https://github.com/adrai/flowchart.js/)): for making flowcharts with the DOT language
- jsmind (using [JSMind](https://github.com/hizzgdev/jsmind/)): for making mindmaps with the DOT language
- quizz (for making stateless quizzes)


## Structure

- `mkdocs.yml`: the MkDocs configuration file

  In this file, you can configure the author name (for displaying in the footer), your email address but you will also have to use it for defining the documentation pages you want to add.

- `src`: your Markdown content files

  In this folder, you can add your Markdown files you will point to in the configuration file.

  - `slides`: your Markdown slide content files

> **Advice**: Each slideshow can contain a flowchart, a mindmap or a quizz ; use a folder with the same name than the Markdown page that contains the iframe for grouping the related files. Check the `template` folder in `slides` to get started.

  - `img`: the images for the documentation (note that this structure is a template and can obviously be adapted, e.g. by putting the images relatively to the content subfolders)

  - `labs`, `exercises`, ...: other content folders

> **Advice**: Keep this structure and work with relative links 

- `theme`: the theme of the documentation website (SHOULD not be modified, unless contributing to this project)


## Usage

### Quick start

```console
$ git clone https://github.com/dhondta/mkdocs-revealjs-template
[...]
$ cd mkdocs-revealjs-template
$ mv src_example src
$ mv mkdocs.yml.template mkdocs.yml
$ cp src/slides/template.md src/slides/intro.md
$ cp -r src/slides/template src/slides/intro
$ mkdocs serve
INFO    -  Building documentation... 
INFO    -  Cleaning site directory 
[I ###### ##:##:## server:283] Serving on http://127.0.0.1:8000
[I ###### ##:##:## handlers:60] Start watching changes
```


### Creating new pages

For each page you create, use this methodology:

1. Copy the Web page template

```console
$ cp src/slides/template.md src/slides/intro.md
$ cp -r src/slides/template src/slides/intro
```

> **Note**: By convention, `md` files are MkDocs pages and are named accordingly. A folder is created with the same name (without the `.md`, of course) and a file named `slides.mdtxt` holds the Reveal.js slideshow.

2. Reference the new page in `mkdocs.yml`

```console
$ gedit mkdocs.yml
```

```gedit
# Reference: http://mkdocs.org
site_name: [...]
site_author: [...]
pages:
  - 'Introduction': index.md
  - 'Introduction':
    - 'A sample slideshow': slides/intro.md
extra:
  mailto: [...]
[...]
```

> **Note**: The first occurrence creates a hyperlink for "*Introduction*". The second occurrence defines subsections accessible through a dropdown list that can be opened using a caret that is displayed when subsections exist. So, for a section without subsections, omit the second occurrence and for subsections without the main section having a hyperlink, omit the first occurrence.


3. Edit items

```console
$ gedit src/slides/intro/*
```

For more information about how to tune your documentation, please consult these tutorials:

- [Tuning the MkDocs web pages](doc/tuning-mkdocs-web-pages.md)
- [Tuning the Reveal.js slideshows](doc/tuning-revealjs-slideshows.md)
- [Writing your docs](http://www.mkdocs.org/user-guide/writing-your-docs/)
- [Building Product Documentation with MkDocs](https://www.sitepoint.com/building-product-documentation-mkdocs/)
- [Reveal.js - The HTML presentation framework](http://lab.hakim.se/reveal-js/#/)
- [Reveal.js on GitHub](https://github.com/hakimel/reveal.js/)

> **Note**: The page is visited by using a directory URL, e.g. `http://localhost:8000/slides/intro/`. This is because the parameter `use_directory_urls: true` is defined in `mkdocs.yml`. It is strongly advised not to change this parameter and to keep using this behaviour.

**Additional information**

Of course, as Markdown can be too limited for some use cases, HTML can be used to insert more sophisticated items.

Reveal.js slideshows are embedded in the documentation by using an `iframe` like follows:

```
<iframe class="slideshow" src="./slideshow.html" frameborder=0></iframe>
```


### Hiding pieces of text

Sometimes, it can be useful to hide some piece of text, e.g. when showing a trace of actions done by a tool while it should not be deductible to know when the tool was run, or on which target, and so forth. For the purpose of easilly hiding patterns of text recursively in a whole folder, [DocTextMasker](https://github.com/dhondta/doc-text-masker) can be used.


## Contribution

For contributions or suggestions, please [open an Issue](https://github.com/dhondta/mkdocs-revealjs-template/issues/new) and clearly explain, using an example or a use case if appropriate.
