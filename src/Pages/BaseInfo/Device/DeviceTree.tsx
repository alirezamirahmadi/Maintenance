
import { Typography, useTheme } from "@mui/material";
import { TreeView } from '@mui/x-tree-view/TreeView';

import { MinusSquare, PlusSquare, CloseSquare, StyledTreeItem } from '../../../Components/CustomizedComponent/CustomizedTreeView'
import { DeviceType } from "../../../Types/BaseInfoType";

export default function DeviceTree({ deviceTree }: { deviceTree: DeviceType }) {
  const theme = useTheme();

  return (
    <div dir="rtl" className="ps-1">
      <TreeView
        aria-label="device tree"
        defaultCollapseIcon={<MinusSquare color='textColor' />}
        defaultExpandIcon={<PlusSquare color='textColor' />}
        defaultEndIcon={<CloseSquare color='textColor' />}
      >
        <StyledTreeItem nodeId={deviceTree.id.toString()} label={
          <Typography variant="textbase" sx={{ cursor: 'pointer' }} color={theme.palette.textColor.main}>{deviceTree.deviceName}</Typography>
        }>
          {
            deviceTree?.subDevice?.map((child) => {
              return (
                <div key={child.id} className="ps-1">
                  <DeviceTree deviceTree={child} />
                </div>
              );
            })
          }
        </StyledTreeItem>
      </TreeView>
    </div>
  )
}