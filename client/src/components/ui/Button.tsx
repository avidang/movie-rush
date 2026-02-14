import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'rounded-full font-semibold hover:opacity-80 cursor-pointer',
  {
    variants: {
      color: {
        primary:
          'bg-primary text-primary-text disabled:bg-disabled disabled:text-disabled-text border-primary',
        secondary:
          'bg-secondary text-secondary-text disabled:bg-disabled disabled:text-disabled-text border-secondary',
        neutral:
          'bg-neutral text-neutral-text disabled:bg-disabled disabled:text-disabled-text border-neutral',
        info: 'bg-info text-info-text disabled:bg-disabled disabled:text-disabled-text border-info',
        error:
          'bg-error text-error-text disabled:bg-disabled disabled:text-disabled-text border-error',
      },
      variant: {
        ghost: 'bg-transparent disabled:bg-transparent',
        outline: 'bg-transparent border',
        default: '',
      },
      size: {
        default: 'text-lg px-4 py-2 flex items-center justify-center',
        icon: 'text-lg p-2 aspect-square h-10 flex items-center justify-center',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'primary',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  color = 'primary',
  size = 'default',
  asChild = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ color, variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
