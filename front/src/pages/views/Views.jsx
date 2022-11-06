import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { AppUseContext } from '../../context';
import { useNavigate } from '../../Hooks';
import { PartialRoutes, Routes } from '../../models';

import ViewSchema from './ViewSchema';

const Views = () => {
  const { state, actions } = AppUseContext();
  const { view } = useParams();
  const { go } = useNavigate();

  useEffect(() => {
    if (Object.values(PartialRoutes).includes(view)) {
      // actions.getItems(view);
    } else {
      go(`/${Routes.HOME}`);
    }
  }, [view]);

  const viewData = useMemo(() => {
    return ViewSchema.filter((schema) => schema.route === view)[0];
  }, [view]);

  return (
    <div>
      <p>{viewData?.title}</p>
    </div>
  );
};

export default Views;
