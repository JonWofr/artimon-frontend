import React from 'react';
import SectionBody from '../section-body';
import SectionHeader from '../section-header';
import Section from '../section';
import ArtimonCard from '../artimon-card';
import { Artimon } from '../../models/Artimon';
import Gerodolon from '../../assets/images/pokemon-1.png';
import Barlow from '../../assets/images/pokemon-2.png';
import Quacksal from '../../assets/images/pokemon-3.png';
import Herndu from '../../assets/images/pokemon-4.png';
import Kramurk from '../../assets/images/pokemon-5.png';
import styles from './ArtidexSection.module.css';

const artimons: Artimon[] = [
  {
    name: 'Gerodolon',
    type: 'fire',
    description:
      'In et dolor reprehenderit dolor occaecat sit. Minim et et Lorem laboris nostrud incididunt dolor minim ea commodo do proident incididunt. Cupidatat sunt proident pariatur exercitation. Incididunt esse est tempor ullamco non enim sit id minim nulla. Enim velit laboris veniam Lorem pariatur enim aliquip aute exercitation. Sit consectetur ea veniam non veniam cillum veniam enim reprehenderit nisi eu. Ex anim ex proident enim quis ut occaecat esse nostrud.',
    avatarUrl: Gerodolon,
    trainer: '0x04f1737124AF05f9CAF0Aa7819267bC2BEC1c29c',
  },
  {
    name: 'Barlow',
    type: 'leaf',
    description:
      'Qui in velit ex occaecat. Sit anim velit ipsum ullamco adipisicing cillum deserunt sint laborum deserunt ea cillum. Commodo sit laboris ipsum tempor dolore in in aliquip amet pariatur. Enim aliqua ad qui amet minim adipisicing dolor. Incididunt veniam velit consequat cupidatat eiusmod quis laboris pariatur id irure sint proident. Consectetur pariatur nulla pariatur ex enim elit in est ipsum elit voluptate aliqua laboris laborum. Ad excepteur nulla dolor minim officia cupidatat mollit enim ad ea.',
    avatarUrl: Barlow,
    trainer: '0x04f1737124AF05f9CAF0Aa7819267bC2BEC1c29c',
  },
  {
    name: 'Quacksal',
    type: 'water',
    description:
      'Voluptate sunt velit commodo Lorem nulla labore reprehenderit laboris sit aliquip occaecat deserunt. Ex dolore exercitation sit cillum aliquip et sit culpa labore cupidatat id nisi. Est anim est labore veniam elit adipisicing irure. Mollit occaecat pariatur aliquip esse dolor officia velit sunt et. In sint labore minim in adipisicing irure aute duis proident pariatur sunt irure elit.',
    avatarUrl: Quacksal,
    trainer: '0x04f1737124AF05f9CAF0Aa7819267bC2BEC1c29c',
  },
  {
    name: 'Herndu',
    type: 'water',
    description:
      'Deserunt sint aute enim ullamco labore exercitation amet id reprehenderit ad enim laborum reprehenderit nisi. Sunt ea consequat culpa ad esse voluptate culpa proident minim ea sint cillum. Officia aliquip commodo nisi adipisicing exercitation voluptate id dolor. Consectetur nostrud exercitation incididunt ad laborum labore est adipisicing cillum cillum commodo nulla aliquip.',
    avatarUrl: Herndu,
    trainer: '0x04f1737124AF05f9CAF0Aa7819267bC2BEC1c29c',
  },
  {
    name: 'Kramurk',
    type: 'leaf',
    description:
      'Eiusmod occaecat consectetur qui id qui ullamco ea commodo deserunt ullamco. Cupidatat minim qui quis exercitation minim voluptate id. Minim deserunt id mollit cupidatat irure. Magna duis in labore aute id reprehenderit eu irure ad fugiat adipisicing excepteur dolor. Aute culpa consequat ullamco esse ut aliquip. Voluptate in officia laboris aliquip enim elit ea pariatur. Eiusmod nisi enim aliquip ea aliqua amet amet amet.',
    avatarUrl: Kramurk,
    trainer: '0x04f1737124AF05f9CAF0Aa7819267bC2BEC1c29c',
  },
];

const ArtidexSection = () => {
  return (
    <Section backgroundColor="secondary">
      <SectionHeader title="All the Artimons at a glance" subtitle="Artidex" />
      <SectionBody>
        <div className={styles.grid}>
          {artimons.map((artimon) => (
            <ArtimonCard artimon={artimon} />
          ))}
        </div>
      </SectionBody>
    </Section>
  );
};

export default ArtidexSection;
