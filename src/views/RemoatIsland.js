import React from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import remoatIslandBG from "../assets/images/maps/Remoat_Island_bg.png";
import "../assets/css/map.css";
import data from "../data/maps/remoat_island";
import goal from "../assets/images/icon_npc/t_Icon_ScoreArea_Friend.png";
import enemyGoal from "../assets/images/icon_npc/t_Icon_ScoreArea_Enemy.png";
import audino from "../assets/images/icon_npc/t_Icon_Audino.png";
import zapdos from "../assets/images/icon_npc/t_Icon_Zapdos.png";
import rotom from "../assets/images/icon_npc/t_Icon_Rotom.png";
import drednaw from "../assets/images/icon_npc/t_Icon_Drednaw.png";
import ludicolo from "../assets/images/icon_npc/t_Icon_Ludicolo.png";
import bouffalant from "../assets/images/icon_npc/t_Icon_Bouffalant.png";
import lillipup from "../assets/images/icon_npc/t_Icon_Lillipup.png";
import combee from "../assets/images/icon_npc/t_Icon_Combee.png";
import vespiquen from "../assets/images/icon_npc/t_Icon_Vespiquen.png";
import corphish from "../assets/images/icon_npc/t_Icon_Corphish.png";
import aipom from "../assets/images/icon_npc/t_Icon_Aipom.png";

function RemoatIsland() {
  const popover = (text) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{data[text].name}</Popover.Title>
      <Popover.Content>
        {data[text].points && <><b>Points: </b> {data[text].points}</>}
        {data[text].spawns && <><br/><b>Spawns: </b> {data[text].spawns}</>}
        {data[text].finalstretch && <><br/><b>Final Stretch: </b> {data[text].finalstretch}</>}
        {data[text].buff && <><br/><b>Buff: </b> {data[text].buff}</>}
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="home">
      <div className="container justify-content-md-center">
        <h1 className="white-shadow-text">Remoat Island</h1>
        <span>5v5, 10 minute time limit</span>
        <div className="map">
          <img className="bg" src={remoatIslandBG} alt="" style={{width:"100%"}} />
          <OverlayTrigger placement="right" overlay={popover("goal3")}>
            <img src={goal} alt="" style={{position:"absolute",top:"46%",left:"17%",width:"6%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("goal2")}>
            <img src={goal} alt="" style={{position:"absolute",top:"30%",left:"24%",width:"6%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("goal1")}>
            <img src={goal} alt="" style={{position:"absolute",top:"22%",left:"38%",width:"6%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("goal2")}>
            <img src={goal} alt="" style={{position:"absolute",top:"61%",left:"24%",width:"6%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("goal1")}>
            <img src={goal} alt="" style={{position:"absolute",top:"68%",left:"38%",width:"6%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("goal3")}>
            <img src={enemyGoal} alt="" style={{position:"absolute",top:"46%",left:"77%",width:"6%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("goal2")}>
            <img src={enemyGoal} alt="" style={{position:"absolute",top:"30%",left:"70%",width:"6%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("goal1")}>
            <img src={enemyGoal} alt="" style={{position:"absolute",top:"22%",left:"56%",width:"6%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("goal2")}>
            <img src={enemyGoal} alt="" style={{position:"absolute",top:"61%",left:"70%",width:"6%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("goal1")}>
            <img src={enemyGoal} alt="" style={{position:"absolute",top:"68%",left:"56%",width:"6%"}} />
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={popover("audino-t2")}>
            <img src={audino} alt="" style={{position:"absolute",top:"31%",left:"16%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-t2")}>
            <img src={audino} alt="" style={{position:"absolute",top:"27%",left:"20%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-t2")}>
            <img src={audino} alt="" style={{position:"absolute",top:"64%",left:"16%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-t2")}>
            <img src={audino} alt="" style={{position:"absolute",top:"68%",left:"20%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-t2")}>
            <img src={audino} alt="" style={{position:"absolute",top:"72%",left:"26%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-t2")}>
            <img src={audino} alt="" style={{position:"absolute",top:"22%",left:"26%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-bot")}>
            <img src={audino} alt="" style={{position:"absolute",top:"80%",left:"39%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-bot")}>
            <img src={audino} alt="" style={{position:"absolute",top:"77%",left:"43%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-bot")}>
            <img src={audino} alt="" style={{position:"absolute",top:"80%",left:"57%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-bot")}>
            <img src={audino} alt="" style={{position:"absolute",top:"77%",left:"52%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-t2")}>
            <img src={audino} alt="" style={{position:"absolute",top:"31%",left:"79%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-t2")}>
            <img src={audino} alt="" style={{position:"absolute",top:"27%",left:"75%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-t2")}>
            <img src={audino} alt="" style={{position:"absolute",top:"22%",left:"70%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-t2")}>
            <img src={audino} alt="" style={{position:"absolute",top:"64%",left:"78%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-t2")}>
            <img src={audino} alt="" style={{position:"absolute",top:"68%",left:"73%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-t2")}>
            <img src={audino} alt="" style={{position:"absolute",top:"72%",left:"69%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("audino-bot-middle")}>
            <img src={audino} alt="" style={{position:"absolute",top:"64%",left:"48%",width:"4%"}} />
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={popover("zapdos")}>
            <img src={zapdos} alt="" style={{position:"absolute",top:"46%",left:"47.2%",width:"6%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("rotom")}>
            <img src={rotom} alt="" style={{position:"absolute",top:"14%",left:"47.7%",width:"5%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("drednaw")}>
            <img src={drednaw} alt="" style={{position:"absolute",top:"83%",left:"47.7%",width:"5%"}} />
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={popover("ludicolo")}>
            <img src={ludicolo} alt="" style={{position:"absolute",top:"40%",left:"27%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("bouffalant")}>
            <img src={bouffalant} alt="" style={{position:"absolute",top:"54%",left:"27%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("bouffalant")}>
            <img src={bouffalant} alt="" style={{position:"absolute",top:"40%",left:"69%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("ludicolo")}>
            <img src={ludicolo} alt="" style={{position:"absolute",top:"54%",left:"69%",width:"4%"}} />
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={popover("lillipup")}>
            <img src={lillipup} alt="" style={{position:"absolute",top:"47%",left:"24%",width:"4%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("lillipup")}>
            <img src={lillipup} alt="" style={{position:"absolute",top:"47%",left:"72%",width:"4%"}} />
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={popover("vespiquen")}>
            <img src={vespiquen} alt="" style={{position:"absolute",top:"24%",left:"47%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("combee")}>
            <img src={combee} alt="" style={{position:"absolute",top:"25%",left:"50%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("vespiquen")}>
            <img src={vespiquen} alt="" style={{position:"absolute",top:"70%",left:"47%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("combee")}>
            <img src={combee} alt="" style={{position:"absolute",top:"71%",left:"50%",width:"3%"}} />
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={popover("corphish-buff")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"35%",left:"30%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish-buff")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"59.5%",left:"30%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"20%",left:"32%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"75%",left:"32%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"38%",left:"37%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"57%",left:"37%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish-zapdos")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"40%",left:"45%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish-zapdos")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"55%",left:"45%",width:"3%"}} />
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={popover("corphish-buff")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"35%",left:"67%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish-buff")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"59.5%",left:"67%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"20%",left:"65%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"75%",left:"65%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"38%",left:"60%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"57%",left:"60%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish-zapdos")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"40%",left:"52%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("corphish-zapdos")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"55%",left:"52%",width:"3%"}} />
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={popover("corphish-top")}>
            <img src={corphish} alt="" style={{position:"absolute",top:"31%",left:"48.5%",width:"3%"}} />
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"42%",left:"19%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"54%",left:"19%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"34%",left:"22%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"60%",left:"22%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"30%",left:"33%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"26%",left:"32%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"69%",left:"32%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"65%",left:"33%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom-top")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"19%",left:"42%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom-top")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"30%",left:"43%",width:"3%"}} />
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"42%",left:"78%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"54%",left:"78%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"34%",left:"75%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"60%",left:"75%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"30%",left:"64%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"26%",left:"65%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"69%",left:"65%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"65%",left:"64%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom-top")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"19%",left:"55%",width:"3%"}} />
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={popover("aipom-top")}>
            <img src={aipom} alt="" style={{position:"absolute",top:"30%",left:"54%",width:"3%"}} />
          </OverlayTrigger>
        </div>
      </div>
    </div>
  )
}

export default RemoatIsland;