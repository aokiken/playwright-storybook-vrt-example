# playwright-storybook-vrt-example

## e2e
### Docker to generate/update the screenshots
```shell
$ yarn run taskbox:build-storybook
$ yarn run e2e:storybook-static-extract-stories
$ docker run --rm --network host -v $(pwd):/work/ -w /work/ -it mcr.microsoft.com/playwright:v1.24.0-focal yarn run e2e:test --update-snapshots
```
