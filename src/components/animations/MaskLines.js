/**
 * Renders text as art-directed lines, each inside an overflow mask,
 * ready for GSAP line reveals (target `.line-inner`).
 *
 * lines:  ['Some journeys', 'change your', 'location.']
 * accent: index of a line rendered in italic serif (optional)
 */
export default function MaskLines({ lines, as: Tag = 'span', className, lineClassName, accent = -1, accentClassName = 'italic', ...rest }) {
  return (
    <Tag className={className} {...rest}>
      {lines.map((text, i) => (
        <span key={i} className={['line', lineClassName].filter(Boolean).join(' ')}>
          <span className={['line-inner', i === accent ? accentClassName : ''].filter(Boolean).join(' ')}>{text}</span>
        </span>
      ))}
    </Tag>
  );
}
