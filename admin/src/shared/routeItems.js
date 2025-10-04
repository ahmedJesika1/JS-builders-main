import { MdOutlineEventAvailable, MdOutlineWorkOutline } from "react-icons/md";
import {
  IoBookOutline,
  IoImageOutline,
  IoNewspaperOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { RiNumbersLine } from "react-icons/ri";
import { LuBookCheck, LuContact, LuImages, LuInfo } from "react-icons/lu";
import { ImProfile } from "react-icons/im";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { SlPeople } from "react-icons/sl";
import { BsGraphUpArrow } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";

export const menuItems = [
  {
    key: "homepage",
    label: "Homepage",
    icon: MdOutlineHomeRepairService,
    children: [
      { key: "banners", label: "Banners", icon: IoImageOutline },
      { key: "about-us", label: "About Us", icon: LuInfo },
    ],
  },
  {
    key: "service",
    label: "Product",
    icon: MdOutlineHomeRepairService,
    path: "/dashboard/service",
  },
  {
    key: "profilepage",
    label: "Company Profile",
    icon: MdOutlineHomeRepairService,
    children: [
      { key: "brochure", label: "Profile", icon: IoBookOutline },
      { key: "our-team", label: "Our Team", icon: GrGroup },
      { key: "our-client", label: "Our Client", icon: GrGroup },
    ],
  },
  {
    key: "gallerypage",
    label: "Gallery",
    icon: MdOutlineHomeRepairService,
    children: [
      { key: "gallery", label: "Gallery", icon: LuImages },
      { key: "video", label: "Video", icon: IoVideocamOutline },
    ],
  },
  {
    key: "amenity",
    label: "Amenities",
    icon: MdOutlineHomeRepairService,
    path: "/dashboard/amenity",
  },
  {
    key: "featured",
    label: "Featured",
    icon: MdOutlineHomeRepairService,
    path: "/dashboard/featured",
  },
  {
    key: "contact",
    label: "User Message",
    icon: LuContact,
    path: "/dashboard/contact",
  },
  {
    key: "client",
    label: "Client Message",
    icon: LuContact,
    path: "/dashboard/client",
  },
  {
    key: "visitors",
    label: "Visitors Message",
    icon: LuContact,
    path: "/dashboard/visitors",
  },
];
