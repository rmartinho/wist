#!/bin/bash

for file in $*; do
	mv $file aspects/$file
	cp aspects/$file sprites/color-$file
done

for file in sprites/color-*.png; do
	convert $file -colorspace gray -transparent grey -separate -average -auto-level sprites/gray-${file#sprites/color-}
done

for file in sprites/color-*.png sprites/gray-*.png; do
	convert $file -filter Lanczos -resize 24x24 $file
done
