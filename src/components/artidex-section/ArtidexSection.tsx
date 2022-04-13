import React, { useEffect, useState } from 'react';
import SectionBody from '../section-body';
import SectionHeader from '../section-header';
import Section from '../section';
import ArtimonCard from '../artimon-card';
import { ArtimonContractHelper } from '../../services/artimon-contract-helper';
import { Artimon } from '../../models/Artimon';
import { ProviderType } from '../../enums/ProviderType';
import Spinner from '../spinner';
import { ReactComponent as ShowMoreIcon } from '../../assets/icons/show-more-icon.svg';
import { ReactComponent as ShowLessIcon } from '../../assets/icons/show-less-icon.svg';

const ArtidexSection = () => {
  const [artimons, setArtimons] = useState<Artimon[]>([]);
  const [shouldShowSpinner, setShouldShowSpinner] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    try {
      onInit();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onInit = async () => {
    setShouldShowSpinner(true);
    await fetchData();
    setShouldShowSpinner(false);
  };

  const fetchData = async () => {
    const artimonContractHelper = new ArtimonContractHelper(
      ProviderType.INFURA
    );
    const artimons = await artimonContractHelper.fetchAllArtimons();
    setArtimons(artimons.reverse());

    artimonContractHelper.onNewArtimon((newArtimon) => {
      // Mints in the current block do also trigger this callback. An additional
      // check is used to ensure that the Artimon is truely new.
      const isTruelyNew =
        artimons.find((artimon) => artimon.tokenId === newArtimon.tokenId) ===
        undefined;
      if (isTruelyNew) {
        setArtimons((artimons) => {
          return [newArtimon, ...artimons];
        });
      }
    });
  };

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Section backgroundColor="secondary">
      <SectionHeader title="All the Artimons at a glance" subtitle="Artidex" />
      <SectionBody>
        <div className="relative min-h-[300px] flex flex-col items-center">
          <div className="w-full grid gap-8 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
            {isExpanded
              ? artimons.map((artimon) => (
                  <ArtimonCard key={artimon.name} artimon={artimon} />
                ))
              : artimons
                  .slice(0, 6)
                  .map((artimon) => (
                    <ArtimonCard key={artimon.name} artimon={artimon} />
                  ))}
          </div>
          {artimons.length > 7 && (
            <button
              onClick={toggleIsExpanded}
              className="flex gap-2 items-center mt-12"
            >
              {isExpanded ? (
                <ShowLessIcon className="w-5 h-5" />
              ) : (
                <ShowMoreIcon className="w-5 h-5" />
              )}

              <p className="font-primary text-secondary font-bold tracking-widest leading-normal">
                {isExpanded ? 'Show less' : 'Show more'}
              </p>
            </button>
          )}
          {shouldShowSpinner && (
            <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
      </SectionBody>
    </Section>
  );
};

export default ArtidexSection;
