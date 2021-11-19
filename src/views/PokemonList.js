import React, {useMemo, useState} from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReactTable from "react-table-v6";
import List from "../data/search.json";
import "react-table-v6/react-table.css";
import "../assets/css/table.css";
import { onImgError } from "../utils/utils";

function PokemonList(props) {

  const [hideColumns, setHideColumns] = useState(window.innerWidth < 992);
  const columns = React.useMemo(() => [
      {
        Header: "Pokemon",
        accessor: "pokemon",
        Cell: (row) => {
          let pathName = row.original.pokemon.toLowerCase().replace(/[^\w]/g, "");
          return <div>
            <img className="portrait-small" src={process.env.PUBLIC_URL + `/img/pokemon/${pathName}_square.png`} alt={row.original.pokemon} onError={e => onImgError(e)}/>
            {" "}
            {row.original.pokemon}
          </div>
        },
        width: 160
      },
      {
        Header: "Range",
        accessor: "range"
      },
      {
        Header: "Role",
        accessor: "role"
      },
      {
        Header: "Offense",
        accessor: "offense",
        show: !hideColumns
      },
      {
        Header: "Endurance",
        accessor: "endurance",
        show: !hideColumns
      },
      {
        Header: "Mobility",
        accessor: "mobility",
        show: !hideColumns
      },
      {
        Header: "Scoring",
        accessor: "scoring",
        show: !hideColumns
      },
      {
        Header: "Support",
        accessor: "support",
        show: !hideColumns
      }
    ], []
  );

  const data = useMemo(() => List.filter(pokemon => pokemon.category === "pokemon").map(pokemon => {
      return {
        pokemon: pokemon.name,
        range: pokemon.range,
        role: pokemon.role,
        offense: pokemon.stats.combat,
        endurance: pokemon.stats.resistance,
        mobility: pokemon.stats.mobility,
        scoring: pokemon.stats.scoring,
        support: pokemon.stats.assistance
      }
    }), []
  );

  const sort = (a, b) => {
    if (typeof a === "number") {
      return b - a;
    } else {
      return a.localeCompare(b);
    }
  };

  const onRowClick = (_, row) => {
    return {
      onClick: () => {
        props.history.push("/pokemon/" + row.original.pokemon.toLowerCase().replace(/[^\w]/g, ""));
      }
    }
  };

  return (
    <div className="home">
      <Container>
        <ReactTable
          data={data}
          pageSize={data.length}
          columns={columns}
          defaultSortMethod={sort}
          showPagination={false}
          getTdProps={onRowClick}
          className="-striped -highlight"
        />
      </Container>
    </div>
  )
}

export default withRouter(PokemonList);