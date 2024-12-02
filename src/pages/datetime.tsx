import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export default () => {
    function test(start: string, end: string) {
        const startTime = dayjs('14:08:01', 'HH:mm:ss')
        const endTime = dayjs('14:08:00', 'HH:mm:ss')
        if (endTime.isAfter(startTime)) {

        }
    }


    test('14:08:00', '14:08:01')
    return (
        <div></div>
    )
}