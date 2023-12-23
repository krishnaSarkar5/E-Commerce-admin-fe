import React from "react";
import Link from "next/link";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { ListItemButton, ListItemDecorator, ListItemContent } from "@mui/joy";
import { KeyboardArrowRight } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";

const Sidebar = () => {
  const pages = [
    { title: "Category", path: "/dashboard/category" },
    { title: "Blog", path: "" },
    { title: "Products", path: "" },
    ,
  ];
  // bg-[#5182ea]
  return (
    <>
      <div className=" sticky w-[200px] h-[90vh] bg-[#9CC3D5FF] pb-5">
        <List>
          {pages?.map((page) => (
            <ListItem>
              <Link href={page?.path}>
                <ListItemButton color="neutral">
                  <ListItemDecorator>
                    <HomeIcon />
                  </ListItemDecorator>
                  <ListItemContent>{page?.title}</ListItemContent>
                  <KeyboardArrowRight />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default Sidebar;
