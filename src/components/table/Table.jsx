"use client";
import React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("1", 159, 6.0, 24, 4.0),
  createData("2", 237, 9.0, 37, 4.3),
  createData("3", 262, 16.0, 24, 6.0),
  createData("4", 305, 3.7, 67, 4.3),
];

const AppTable = ({ data, tableConfig, activeDeleteAction, deleteAction }) => {
  console.log("+-+- ", data);
  return data?.length > 0 ? (
    <Box>
      {/* <Typography level="body-sm" textAlign="center" sx={{ pb: 2 }}>
        ← Scroll direction →
      </Typography> */}
      <Sheet
        variant="outlined"
        sx={{
          "--TableCell-height": "40px",
          // the number is the amount of the header rows.
          "--TableHeader-height": "calc(1 * var(--TableCell-height))",
          "--Table-firstColumnWidth": "80px",
          "--Table-lastColumnWidth": "144px",
          // background needs to have transparency to show the scrolling shadows
          "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
          "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
          overflow: "auto",
          background: (theme) =>
            `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
          linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
          radial-gradient(
            farthest-side at 0 50%,
            rgba(0, 0, 0, 0.12),
            rgba(0, 0, 0, 0)
          ),
          radial-gradient(
              farthest-side at 100% 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            )
            0 100%`,
          backgroundSize:
            "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "local, local, scroll, scroll",
          backgroundPosition:
            "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
          backgroundColor: "background.surface",
        }}
      >
        <Table
          borderAxis="bothBetween"
          stripe="odd"
          hoverRow
          sx={{
            "& tr > *:first-child": {
              position: "sticky",
              left: 0,
              boxShadow: "1px 0 var(--TableCell-borderColor)",
              bgcolor: "background.surface",
            },
            "& tr > *:last-child": {
              position: "sticky",
              right: 0,
              bgcolor: "var(--TableCell-headBackground)",
            },
          }}
        >
          <thead>
            <tr>
              {tableConfig?.length > 0 &&
                tableConfig?.map((column, index) => (
                  <th
                    style={{
                      width:
                        index === 0 ? "var(--Table-firstColumnWidth)" : 200,
                    }}
                  >
                    {column?.columnName}
                  </th>
                ))}

              <th
                aria-label="last"
                style={{ width: "var(--Table-lastColumnWidth)" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data?.map((row, index) => {
                const deleteEnable = activeDeleteAction(row);

                return (
                  <tr>
                    {tableConfig?.length > 0 &&
                      tableConfig?.map((tc) => <td>{row[tc.fieldName]}</td>)}
                    <td>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button size="sm" variant="plain" color="neutral">
                          <RemoveRedEyeIcon />
                        </Button>
                        <Button
                          size="sm"
                          variant="soft"
                          color="danger"
                          disabled={!deleteEnable}
                          onClick={() => deleteAction(row)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </td>
                  </tr>
                );
              })}
            {/* {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.calories}</td>
              <td>{row.fat}</td>
              <td>{row.carbs}</td>
              <td>{row.protein}</td>
              <td>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button size="sm" variant="plain" color="neutral">
                    Edit
                  </Button>
                  <Button size="sm" variant="soft" color="danger">
                    Delete
                  </Button>
                </Box>
              </td>
            </tr>
          ))} */}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  ) : null;
};

export default AppTable;
