import styled from 'styled-components';

export const Bold = styled.p`
  margin: 0;
  font-weight: 900;
  font-size: 20px;
`;

export const Text = styled.p(({lineheight='22px', size='18px', weight='500', color='#011F3B'}) =>`
font-weight: ${weight};
font-size: ${size};
line-height: ${lineheight};
text-align: center;
color: ${color};
  margin: 0;
`);

export const Title = styled.p(({justify='flex-start', size='28px', padding='0px', weight='600'}) =>`
font-weight: ${weight};
font-size: ${size};
color: #011F3B;
display: flex;
justify-content: ${justify};
padding: ${padding};
`);