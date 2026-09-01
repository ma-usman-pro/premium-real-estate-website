export const agents = [
  {
    id: 'oliver-bennett',
    name: 'Oliver Bennett',
    role: 'Senior Property Advisor',
    phone: '+44 20 7946 0961',
    email: 'oliver.bennett@veraestates.com',
    bio: 'Oliver leads on prime central London sales, with a particular focus on Kensington, Hampstead and the wider North-West.',
    listings: 18,
    photo: 'https://i.pravatar.cc/500?img=13',
  },
  {
    id: 'sophia-williams',
    name: 'Sophia Williams',
    role: 'Luxury Property Specialist',
    phone: '+44 20 7946 0962',
    email: 'sophia.williams@veraestates.com',
    bio: 'Sophia specialises in the luxury townhouse market across Chelsea, Notting Hill and Islington, guiding clients from search to completion.',
    listings: 22,
    photo: 'https://i.pravatar.cc/500?img=47',
  },
  {
    id: 'james-carter',
    name: 'James Carter',
    role: 'Investment Consultant',
    phone: '+44 20 7946 0963',
    email: 'james.carter@veraestates.com',
    bio: 'James advises private and institutional investors on acquisitions across new developments, Canary Wharf and East London.',
    listings: 15,
    photo: 'https://i.pravatar.cc/500?img=53',
  },
  {
    id: 'amelia-rose',
    name: 'Amelia Rose',
    role: 'Residential Advisor',
    phone: '+44 20 7946 0964',
    email: 'amelia.rose@veraestates.com',
    bio: 'Amelia works closely with families relocating to London, drawing on deep knowledge of schools, transport and neighbourhood life.',
    listings: 19,
    photo: 'https://i.pravatar.cc/500?img=32',
  },
];

export function getAgentById(id) {
  return agents.find((a) => a.id === id);
}
