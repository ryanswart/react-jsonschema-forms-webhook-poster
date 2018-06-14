#!/bin/sh

if [ -z "$REACT_APP_SCHEMA" ]; then
  export REACT_APP_SCHEMA=`cat ./config/schema.json`;
fi;


if [ -z "$REACT_APP_MARKDOWN_MAPPING" ]; then
  export REACT_APP_MARKDOWN_MAPPING=`cat ./config/md_mapping.json`;
fi;

REACT_APP_MARKDOWN_MAPPING=${REACT_APP_MARKDOWN_MAPPING} REACT_APP_SCHEMA=${REACT_APP_SCHEMA} $1 $2 $3
