import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./utils/Auth";
import Pokemon from "./views/Pokemon";
import Home from "./views/Home";
import PokemonList from "./views/PokemonList";
import Maps from "./views/Maps";
import NotFound from "./views/NotFound";
import Items from "./views/Items";
import HeldItem from "./views/HeldItem";
import BattleItem from "./views/BattleItem";
import Forum from "./Forum/Forum";
import Thread from "./Forum/Thread";
import ForumTopic from "./Forum/ForumTopic";
import Login from "./Forum/Login";
import Register from "./Forum/Register";
import ReportQueue from "./Forum/ReportQueue";
import Terms from "./views/Terms";
import Profile from "./Forum/Profile";
import RemoatIsland from "./views/RemoatIsland";
import Messages from "./Forum/Messages";
import Message from "./Forum/Message";
import ResetPassword from "./Forum/ResetPassword";

function Routes() {

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/pokemon">
        <PokemonList />
      </Route>
      <Route path="/pokemon/:name">
        <Pokemon />
      </Route>
      <Route exact path="/maps">
        <Maps />
      </Route>
      <Route path="/maps/remoatIsland">
        <RemoatIsland />
      </Route>
      <Route path="/items">
        <Items />
      </Route>
      <Route path="/held item/:name">
        <HeldItem />
      </Route>
      <Route path="/battle item/:name">
        <BattleItem />
      </Route>
      <Route exact path="/forum">
        <Forum />
      </Route>
      <Route exact path="/forum/messages">
        <Messages />
      </Route>
      <Route exact path="/forum/messages/:messageId">
        <Message />
      </Route>
      <Route exact path="/forum/reports">
        <ReportQueue />
      </Route>
      <Route exact path="/forum/users/:username">
        <Profile />
      </Route>
      <Route exact path="/forum/:topic">
        <ForumTopic />
      </Route>
      <Route path="/forum/threads/:threadId/:page?">
        <Thread />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/reset">
        <ResetPassword />
      </Route>
      <Route exact path="/terms">
        <Terms />
      </Route>
      <Route path="/">
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes;