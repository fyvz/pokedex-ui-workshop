"use client";


import { Badge } from "react-bootstrap";
import TYPE_COLORS from "@/utils/typeColors";


interface PokemonCardCompProps {
   pokemonTypes: string[];
}


export default function PokemonTypeBadgeComp(props: PokemonCardCompProps) {
   return (
       <>
           {props.pokemonTypes?.map((pokemonType, index) => {
               const color = TYPE_COLORS[pokemonType] || 'gray';
               return (
                   <Badge
                       key={index}
                       style={{ backgroundColor: color, color: 'white' }}
                       className="me-1"
                   >
                       {pokemonType}
                   </Badge>
               );
           })}
       </>
   );
}
