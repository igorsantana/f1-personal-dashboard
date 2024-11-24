const FlagService = () => {
    const mapper = new Map<string, string>()

    const codeFlag: string[][] = [
        ['AUS', '🇦🇺'], ['BRN', '🇧🇭'], ['KSA', '🇸🇦'], ['JPN', '🇯🇵'],
        ['CHN', '🇨🇳'], ['USA', '🇺🇸'], ['ITA', '🇮🇹'], ['MON', '🇲🇨'],
        ['CAN', '🇨🇦'], ['ESP', '🇪🇸'], ['AUT', '🇦🇹'], ['GBR', '🇬🇧'],
        ['HUN', '🇭🇺'], ['BEL', '🇧🇪'], ['NED', '🇳🇱'], ['AZE', '🇦🇿'],
        ['SGP', '🇸🇬'], ['MEX', '🇲🇽'], ['BRA', '🇧🇷'], ['QAT', '🇶🇦'],
        ['UAE', '🇦🇪']]

    codeFlag.forEach(([code, flag]) => mapper.set(code, flag))

    const getFlag = (code: string): string | undefined => {
        return mapper.get(code)
    }

    return getFlag
}

export default FlagService;