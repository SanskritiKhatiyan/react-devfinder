import React from "react";
import "./DisplayData.css";
import "./DisplayDataMobile.css";
import loc from "./images/location-svgrepo-com.svg";
import twi from "./images/twitter-svgrepo-com.svg";
import li from "./images/link-svgrepo-com.svg";
import comp from "./images/building-svgrepo-com.svg";

const DisplayData = (props) => {
  console.log(props.userdata);
  const {
    name,
    login,
    bio,
    public_repos,
    html_url,
    followers,
    followers_url,
    following,
    following_url,
    location,
    repos_url,
    blog,
    company,
    twitter_username,
  } = props?.userdata?.data;

  const date = new Date(props.userdata.data.created_at);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateinfo = `Joined ${date.getDate() - 1}
  ${months[date.getMonth()]}
  ${date.getFullYear()}`;

  return (
    <div className="display-box">
      <div className="upper">
        <img className="avatar" src={props?.userdata?.data?.avatar_url} />

        <div className="three-det">
          <div className="name"> {name}</div>
          <a className="login" href={html_url}>
            @{login}
          </a>
          {bio ? (
            <div className="bio">{bio}</div>
          ) : (
            <div className="bio">This profile has no bio </div>
          )}
        </div>

        <div className="date">{dateinfo}</div>
      </div>

      <div className="lower">
        <div className="numbers">
          <div className="respos">
            <p>Repos</p>
            <a href={repos_url}>{public_repos}</a>
          </div>
          <div className="followers">
            <p>Followers</p>
            <a href={followers_url}>{followers}</a>
          </div>
          <div className="following">
            <p>Following</p>
            <a href={following_url}>{following}</a>
          </div>
        </div>
        <div className="links">
          <div className="a1">
            <div className="location">
              <img src={loc} />
              {location ? (
                <span>{location}</span>
              ) : (
                <span className="not">Not available</span>
              )}
            </div>
            <div className="blog">
              <img src={li} />
              {blog ? (
                <span>{blog}</span>
              ) : (
                <span className="not">Not available</span>
              )}
            </div>
          </div>

          <div className="a2">
            <div className="twitter">
              <img src={twi} />
              {twitter_username ? (
                <span>{twitter_username}</span>
              ) : (
                <span className="not">Not available</span>
              )}
              {twitter_username}
            </div>
            <div className="company">
              <img src={comp} />
              {company ? (
                <span>{company}</span>
              ) : (
                <span className="not">Not available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
