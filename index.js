/*
In this case 10^n10, n was used as the timeout where nn is the retry count. 
In other words the first 5 retries will have the following delays: [1 ms, 10 ms, 100 ms, 1 s, 10 s][1ms,10ms,100ms,1s,10s].
*/

const delay = retryCount => new Promise(resolve => setTimeout(resolve, 10 ** retryCount));

const getResource = (retryCount = 0) => apiCall().catch(() => delay(retryCount).then(() => getResource(retryCount + 1)));

// Using async/await and Adding a Retry Limit

const getResourceWithLimitTimes = async (retryCount = 0, lastError = null) => {
    if (retryCount > 5) throw new Error(lastError);
    try {
        return apiCall();
    } catch (e) {
        await delay(retryCount);
        return getResourceWithLimitTimes(retryCount + 1, e);
    }
};