import { Box, Link } from '@mui/material';
import { TableOnFloorPlan } from '../data';

interface FloorplanTableProps {
  tableOnFloorplan: TableOnFloorPlan;
  image: string;
  disabled: boolean;
  onClick: () => void;
}

/**
 * A clickable table image on a floorplan
 * @param {FloorplanTableProps} props the props
 * @return {JSX.Element}
 */
export default function FloorplanTable(props: FloorplanTableProps) {
  const { tableOnFloorplan, image, disabled, onClick } = props;

  return (
    <Box
      sx={{
        position: 'absolute',
        left: tableOnFloorplan.position?.x,
        top: tableOnFloorplan.position?.y,
        width: tableOnFloorplan.size?.width,
        height: tableOnFloorplan.size?.height,
      }}
    >
      <Link
        style={{
          textDecoration: 'none',
          color: 'inherit',
          pointerEvents: disabled ? 'none' : undefined,
        }}
        onClick={onClick}
      >
        <img
          style={{
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            filter: disabled ? 'grayscale(100%)' : undefined,
          }}
          src={image}
        />
      </Link>
    </Box>
  );
}
