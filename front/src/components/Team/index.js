import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import './Team.scss';

const Team = () => (

  <div className="team-cards">
    <Card.Group itemsPerRow={5}>
      <Card>
        <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" wrapped ui={false} />
        <Card.Content>
          <Card.Header>Audrey</Card.Header>
          <ul>
            <li>
              <Icon name="linkedin" />
              <a href="#">Linkedin</a>
            </li>
            <li>
              <Icon name="github" />
              <a href="#">Github</a>
            </li>
          </ul>
        </Card.Content>
      </Card>
      <Card>
        <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" wrapped ui={false} />
        <Card.Content>
          <Card.Header>Loïc</Card.Header>
          <ul>
            <li>
              <Icon name="linkedin" />
              <a href="#">Linkedin</a>
            </li>
            <li>
              <Icon name="github" />
              <a href="#">Github</a>
            </li>
          </ul>
        </Card.Content>
      </Card>

      <Card>
        <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" wrapped ui={false} />
        <Card.Content>
          <Card.Header>Alexandre</Card.Header>
          <ul>
            <li>
              <Icon name="linkedin" />
              <a href="#">Linkedin</a>
            </li>
            <li>
              <Icon name="github" />
              <a href="#">Github</a>
            </li>
          </ul>
        </Card.Content>
      </Card>

      <Card>
        <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" wrapped ui={false} />
        <Card.Content>
          <Card.Header>Quentin</Card.Header>
          <ul>
            <li>
              <Icon name="linkedin" />
              <a href="#">Linkedin</a>
            </li>
            <li>
              <Icon name="github" />
              <a href="#">Github</a>
            </li>
          </ul>
        </Card.Content>
      </Card>

      <Card>
        <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" wrapped ui={false} />
        <Card.Content>
          <Card.Header>Cécilia</Card.Header>
          <ul>
            <li>
              <Icon name="linkedin" />
              <a href="#">Linkedin</a>
            </li>
            <li>
              <Icon name="github" />
              <a href="#">Github</a>
            </li>
          </ul>
        </Card.Content>
      </Card>

    </Card.Group>
  </div>
);

export default Team;
