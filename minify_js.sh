#!/bin/sh

prepare() {
  current_branch="$(git rev-parse --abbrev-ref HEAD)"
  if [[ "${current_branch}" != "develop"  ]]; then
    echo "Not on develop branch, no minify action";
    exit 0;
  fi; 
}

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_files() {
  git add . *.min.js
  git commit --message "Minify JS assets"
}

upload_files() {
  git remote add origin-push https://${GH_TOKEN}@github.com/liushuyu/website-site-ng.git > /dev/null 2>&1
  git push --quiet --set-upstream origin-push develop 
}

prepare
setup_git
commit_files
upload_files

