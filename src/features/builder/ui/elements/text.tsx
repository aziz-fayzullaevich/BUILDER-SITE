export const TextElement = ({ id, style, props }: any) => (
  <div 
    id={id} 
    style={{ 
      ...style, 
      display: 'block',
      wordBreak: 'break-word' 
    }}
  >
    {props?.content || "Текст"}
  </div>
);