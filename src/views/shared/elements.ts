import { Attributes, Button, Composite, LayoutData, TextInput, TextView } from 'tabris';
import { colors, fonts, sizes } from '@resources';

export const PrimaryButton = ({ ...attr }: Attributes<Button>): Button =>
  Button({
    height: sizes.buttonHeight,
    font: fonts.button,
    background: colors.primary,
    textColor: colors.white,
    cornerRadius: sizes.buttonCornerRadius,
    ...attr
  }, PrimaryButton);

export const Label = (attr: Attributes<TextView>): TextView =>
  TextView({
    font: fonts.label,
    textColor: colors.black,
    ...attr
  }, Label);

export const TextField = (attr: Attributes<TextInput>): TextInput =>
  TextInput({
    height: sizes.textInputHeight,
    font: fonts.textField,
    textColor: colors.black,
    borderColor: colors.primary,
    cursorColor: colors.secondary,
    background: 'transparent',
    cornerRadius: sizes.textInputCornerRadius,
    ...attr
  }, TextField);

export const Message = (attr: Attributes<TextView>): TextView =>
  TextView({
    font: fonts.message,
    textColor: colors.black,
    ...attr
  }, Message);

export const Separator = (attr: Attributes<Composite>): Composite =>
  Composite({
    height: sizes.separatorHeight,
    background: colors.gray,
    ...attr
  }, Separator);

export const EmptyView = (attr: Attributes<Composite>): Composite =>
  Composite({
    layoutData: LayoutData.stretchX,
    height: sizes.spacing,
    ...attr
  }, Separator);
