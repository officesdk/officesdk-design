#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  readonly husky_skip_init=1
  export husky_skip_init
  sh -e "$0" "$@"
  exitCode="$?"
  [ "$exitCode" != 0 ] && echo "husky - hook exited with code $exitCode"
  [ "$exitCode" = 127 ] && echo "husky - command not found in PATH=$PATH"
  exit "$exitCode"
fi
