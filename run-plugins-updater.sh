#!/bin/bash

PLUGINS=$(phonegap plugin list | awk '{print $1}')

for PLUGIN in $PLUGINS; do
    phonegap plugin remove $PLUGIN && phonegap plugin add $PLUGIN
done
