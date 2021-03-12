import { ColorResources, FontResources, Image, Resources, TextResources, app } from 'tabris';
import * as colorData from './colors.json';
import * as imageData from './images.json';
import * as sizesData from './sizes.json';
import * as fontData from './fonts.json';
import * as textData from './texts.json';

app.registerFont('open-sans-regular', 'assets/fonts/open-sans-regular.ttf');

export const colors = ColorResources.from(colorData);
export const fonts = FontResources.from(fontData);
export const texts = TextResources.from(textData);
export const images = Resources.build({
  type: Image,
  validator: Image.isValidImageValue,
  converter: Image.from
}).from(imageData);

export const sizes = Resources.build({
  validator: (value): value is number => typeof value === 'number'
}).from(sizesData);
