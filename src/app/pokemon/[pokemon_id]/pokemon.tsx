import Pokemon from "@/model/pokemon";
import { Row, Col, Container, ProgressBar, Badge, Card, Image } from 'react-bootstrap';


type Props ={
   pokemon: Pokemon;
}


export default function PokemonComponent(props : Props) {
    const {pokemon} = props;
    const stats = [
    { label: 'Speed', value: pokemon.speed,   variant: 'info'    },
    { label: 'Health points', value: pokemon.healthPoints, variant: 'danger'  },
    { label: 'Attack', value: pokemon.attack, variant: 'warning' },
    { label: 'Defense', value: pokemon.defense, variant: 'success' },
    ];

    return (
 <Container className="py-4">
      <Row className="justify-content-center mb-4">
        <Col md="auto">
          <h1>{pokemon.pokemonName}</h1>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Image src={pokemon.mainImage} thumbnail fluid />
        </Col>

        <Col md={8}>
          {/* Stats */}
          <Card className="mb-4">
            <Card.Body>
              <h5>Stats</h5>
              {stats.map(({ label, value, variant }) => (
                <div key={label} className="mb-3">
                  <strong>{label}</strong>
                  <ProgressBar 
                    now={value} 
                    label={`${value}`} 
                    variant={variant} 
                    className="mt-1" 
                  />
                </div>
              ))}
            </Card.Body>
          </Card>

          {/* Types */}
          <Card className="mb-4">
            <Card.Body>
              <h5>Pokémon type</h5>
              {pokemon.pokemonType.map(type => (
                <Badge bg="secondary" key={type} className="me-2">
                  {type}
                </Badge>
              ))}
            </Card.Body>
          </Card>

          {/* Evolution Family */}
          <Card>
            <Card.Body>
              <h5>Evaluation family</h5>
              {pokemon.evolutionFamily.map(name => {
                let badgeVariant: string;
                let badgeText: string;

                if (name === pokemon.devolution) {
                  badgeVariant = 'danger';
                  badgeText = 'Devolution';
                } else if (name === pokemon.evolution) {
                  badgeVariant = 'success';
                  badgeText = 'Evolution';
                } else if (name === pokemon.pokemonName) {
                  badgeVariant = 'primary';
                  badgeText = 'Current';
                } else {
                  badgeVariant = 'light';
                  badgeText = '';
                }

                return (
                  <div key={name} className="d-flex align-items-center mb-2">
                    <span className="me-3">{name}</span>
                    {badgeText && <Badge bg={badgeVariant}>{badgeText}</Badge>}
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    );
}
