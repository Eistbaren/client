import { IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';

/**
 * Displays the flaoting Sidebar with imprint and api docs
 * @param {boolean} params
 * @return {JSX.Element}
 */
export default function FloatingSidebar(params: {
  onImprintClicked: () => void;
}) {
  const { onImprintClicked } = params;
  return (
    <div className='social-icons'>
      <Tooltip
        title='Imprint'
        placement='right'
        arrow
        onClick={onImprintClicked}
      >
        <IconButton>
          <InfoIcon fontSize='large' className='social-icon' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Documentation' placement='right' arrow>
        <IconButton href='https://www.reservation-bear.de/api/' target='_blank'>
          <BookIcon fontSize='large' className='social-icon' />
        </IconButton>
      </Tooltip>
    </div>
  );
}
