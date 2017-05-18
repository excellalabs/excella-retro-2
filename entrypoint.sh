#!/bin/bash

set -e

ng build --prod --aot
npm start