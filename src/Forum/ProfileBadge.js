import React from "react";

function ProfileBadge(props) {

  switch (props.status) {
    case 0:
      return <div className="profile-badge member">Member</div>
    case 3:
      return <div className="profile-badge banned">Banned</div>
    case 4:
      return <div className="profile-badge developer">Developer</div>
    case 7:
      return <div className="profile-badge developer">Tournament Coordinator</div>
    case 8:
      return <div className="profile-badge moderator">Moderator</div>
    case 9:
      return <div className="profile-badge owner">Site Owner</div>
    default:
      return <div className="profile-badge member"/>

  }
}

export default ProfileBadge;