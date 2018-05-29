import React from 'react';

const FilteredList = (props) => {
  const formatDate = (dateString) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const date = new Date(dateString);
    const ordinalIndicator = ((dateObj) => {
      const date = dateObj.getDate();
      let indicator;

      if (date === 1 || date === 21 || date === 31) {
        indicator = 'st';
      } else if (date === 2 || date === 22) {
        indicator = 'nd';
      } else if (date === 3 || date === 23) {
        indicator = 'rd';
      } else {
        indicator = 'th';
      }

      return `${date}${indicator}`;
    })(date);
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const time = `${hours}:${minutes}${date.getHours() >= 12 ? 'pm' : 'am'}`;

    return `${ordinalIndicator} ${months[date.getMonth()]} ${date.getFullYear()} at ${time}`;
  };

  const generateLinks = (links) => {
    const generateLink = (label, url) => {
      return (
        <li>
          <a href={url} target="_blank">{label}</a>
        </li>
      );
    };

    return (
      <ul className="links">
        {links.reddit_campaign ? generateLink('Reddit Campaign', links.reddit_campaign) : null}
        {links.reddit_launch ? generateLink('Reddit Launch', links.reddit_launch) : null}
        {links.reddit_recovery ? generateLink('Reddit Recovery', links.reddit_recovery) : null}
        {links.reddit_media ? generateLink('Reddit Media', links.reddit_media) : null}
        {links.presskit ? generateLink('Press Kit', links.presskit) : null}
        {links.article_link ? generateLink('Article', links.article_link) : null}
        {links.video_link ? generateLink('Watch Video', links.video_link) : null}
      </ul>
    );
  };

  return (
    <div className="filterable-list-items">
      <p className="mission-count">Showing {props.items.length} Mission{props.items.length === 1 ? '' : 's'}</p>
      <ul>
        {props.items.map((item, i) => {
          let status = '';

          if (('launch_success' in item) && !item.launch_success) {
            status = <span className="failed-mission">Failed Launch</span>;
          } else if (('land_success' in item) && !item.land_success) {
            status = <span className="failed-mission">Failed Landing</span>;
          }

          return (
            <li key={i}>
              <img
                className="mission-patch"
                src={item.links.mission_patch} alt={item.rocket.rocket_name}
              />
              <div className="flight-details">
                <h4>{item.rocket.rocket_name} - {item.payloads[0].payload_id}{status ? ' - ' : ''}{status}</h4>
                <p>Launched on {formatDate(item.launch_date_local)} from {item.launch_site.site_name}</p>
                {generateLinks(item.links)}
              </div>
              <div className="flight-number">
                <h3>#{item.flight_number}</h3>
                <p>Flight Number</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilteredList;
