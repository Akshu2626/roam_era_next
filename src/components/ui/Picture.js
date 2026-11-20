import { img } from '@/lib/images';

/**
 * Responsive photo. Serves a portrait crop to phones when one exists.
 * Below-the-fold images lazy-load; pass `priority` for the hero.
 */
export default function Picture({ name, alt = '', className, imgClassName, priority = false, style, imgStyle, ...rest }) {
  const { src, mobile } = img(name);
  return (
    <picture className={className} style={style}>
      {mobile && <source media="(max-width: 767px) and (orientation: portrait)" srcSet={mobile} />}
      <img
        src={src}
        alt={alt}
        className={imgClassName}
        style={imgStyle}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        draggable={false}
        {...rest}
      />
    </picture>
  );
}
