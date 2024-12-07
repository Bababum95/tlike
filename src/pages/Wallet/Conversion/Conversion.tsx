import { useState } from "react";

import { Page, SelectBalance } from "@/components";

export const Conversion = () => {
  const [values, setValues] = useState<{ token: string }>({
    token: "like",
  });

  const handleChangeToken = (token: string) => {
    setValues({ token });
  };

  return (
    <Page>
      <div>
        <h1>Конвертация токенов</h1>
        <SelectBalance value={values.token} handleChange={handleChangeToken} />
      </div>
    </Page>
  );
};
