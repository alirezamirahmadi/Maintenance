import { useNavigate, useParams } from "react-router";
import { Typography } from "@mui/material";
import { TreeView } from '@mui/x-tree-view/TreeView';

import { MinusSquare, PlusSquare, CloseSquare, StyledTreeItem } from '../../../Components/CustomizedComponent/CustomizedTreeView'
import { DeviceType } from "../../../Types/BaseInfoType";

export default function DeviceTree({ deviceTree }: { deviceTree: DeviceType }) {
  const navigate = useNavigate();
  const deviceParams = useParams();
  const handleLoadDevice = (idDevice: number) => {
    navigate(`/device/${idDevice}`)
  }

  return (
    <div className="ps-1">
      <TreeView
        aria-label="device tree"
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        defaultEndIcon={<CloseSquare />}
      >
        <StyledTreeItem nodeId={deviceTree.id?.toString() ?? ''} label={
          <Typography onClick={() => handleLoadDevice(deviceTree.id ?? 0)} variant="body1" color={deviceParams.idDevice === deviceTree.id?.toString() ? 'primary' :'text.primary'}>{deviceTree.deviceName}</Typography>
        }>
          {
            deviceTree?.subDevice?.map((child) => {
              return (
                <DeviceTree key={child.id} deviceTree={child} />
              )
            })
          }
        </StyledTreeItem>
      </TreeView>
    </div>
  )
}