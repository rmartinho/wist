#!/bin/bash

for file in $*; do
	mv $file aspects/$file
	cp aspects/$file sprites/$file
done

for file in sprites/*.png; do
	convert $file -colorspace gray -transparent grey -separate -average -auto-level sprites/gray/${file#sprites/}
done

for file in sprites/*.png sprites/gray/*.png; do
	convert $file -filter Lanczos -resize 24x24 $file
done
