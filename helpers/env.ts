import { envsafe, str } from "envsafe";

export default envsafe({
  SECRET: str({
    devDefault: "xxxxx",
  }),
});
