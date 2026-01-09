import { Box } from "@sanity/ui";

export const TablePreview: any = ({ actions, table }: any) => {
    const Actions = actions;
  
    return (
      <Box>
        {Actions && typeof Actions === 'function' ? <Actions layout="default" /> : Actions}
        <CustomTable table={table} />
      </Box>
    );
  };