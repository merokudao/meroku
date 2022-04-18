
- [Welcome to MerokuDAO contributing guide <!-- omit in toc -->](#welcome-to-merokudao-contributing-guide------omit-in-toc----)
- [We Develop with Github](#we-develop-with-github)
- [Issues](#issues)
  * [Create a new issue](#create-a-new-issue)
  * [Solve an issue](#solve-an-issue)
    + [Make Changes](#make-changes)
- [Discussions](#discussions)

# Welcome to MerokuDAO contributing guide <!-- omit in toc -->

We love your input! It’s people like you that make it a reality for users in our community. We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer


Read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

# We Develop with Github

We use github to host code, to track issues and feature requests, as well as accept pull requests. 
In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

# Issues

## Create a new issue

If you spot a problem with the docs, [search if an issue already exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/merokudao/meroku/issues/new/choose). 

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can. [My stackoverflow question](http://stackoverflow.com/q/12488905/180626) includes sample code that *anyone* with a base R setup can run to reproduce what I was seeing
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People *love* thorough bug reports. I'm not even kidding.

## Solve an issue

Scan through our [existing issues](https://github.com/merokudao/meroku/issues) to find one that interests you. You can narrow down the search using `labels` as filters. See [Labels](/contributing/how-to-use-labels.md) for more information. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

### Make Changes

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. Make sure your code lints.
5. Commit your update. Commit the changes once you are happy with them. See [Atom's contributing guide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages) to know how to use emoji for commit messages.. Once your changes are ready, don't forget to [self-review](https://github.com/github/docs/blob/main/contributing/self-review.md) to speed up the review process:zap:.
6. Open that PR. Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
  - Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
  - Once you submit your PR, a contributor  will review your proposal. We may ask questions or request for additional information.
  - We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
  - As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
  - If you run into any merge issues, checkout this [git tutorial](https://lab.github.com/githubtraining/managing-merge-conflicts) to help you resolve merge conflicts and other issues.
7. Congratulations :tada::tada: The Meroku DAO team thanks you :sparkles:.

# Discussions

We use Discussions to brainstorm on ideas. [Visit Discussions](https://github.com/merokudao/meroku/discussions)
