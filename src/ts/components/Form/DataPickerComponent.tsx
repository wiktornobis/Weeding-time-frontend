import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type DatePickerComponentProps = {
    name: string;
    control: any;
    label: string;
    error: boolean;
    helperText: string | undefined;
};

const DatePickerComponent = ({ name, control, label, error, helperText }: DatePickerComponentProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={label}
                        value={value ? dayjs(value) : null}
                        onChange={(newValue) => onChange(newValue ? newValue.toDate() : null)}
                        minDate={dayjs()}
                        format={"DD.MM.YYYY"}
                        slotProps={{
                            textField: {
                                variant: "outlined",
                                error: error,
                                helperText: helperText,
                            },
                        }}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default DatePickerComponent;
